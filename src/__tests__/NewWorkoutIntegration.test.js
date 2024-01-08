import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { screen, render, fireEvent, waitFor, within } from "@testing-library/react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { WorkoutContextProvider } from "../context/workoutContext";
import { AuthContextProvider } from "../context/authContext";

jest.mock("react-router-dom", () => ({ 
	useLocation: jest.fn(),
	useNavigate: jest.fn()
}));

describe("Workout Editor", () => {
	let mockNavigate;

	beforeEach(() => {
		useLocation.mockReturnValue({});

		mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve([{ name: "Front Squats" }, { name: "Back Squats" }]),
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	

	test("Integration Test: Entering set values updates context states", async () => {
		render(
			<AuthContextProvider>
				<WorkoutContextProvider testState>
					<TrainingEditor isWorkout/>
				</WorkoutContextProvider>
			</AuthContextProvider>
		);

		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises.length).toEqual(0);
		});
		
		await act(async () => {
			const trainingNameInputEl = screen.getByLabelText("training-name-input").querySelector("input");
			fireEvent.change(trainingNameInputEl, { target: { value: "Leg Day" } });

			const addExerciseBtnEl = screen.getByLabelText("add-exercise-button");
			fireEvent.click(addExerciseBtnEl);
		});

		await waitFor(() => {
			expect(screen.getByText("Select Exercise")).toBeInTheDocument();
		});

		await act (async () => {
			const frontSquatListBtn = await screen.findByText("Front Squats");
			fireEvent.click(frontSquatListBtn);
		});

		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(screen.getByText("Front Squats")).toBeInTheDocument();
			expect(state.exercises.length).toEqual(1);
		});

		await act (async () => {
			const weightEl = await screen.findAllByLabelText("weight-input");
			expect(weightEl.length).toEqual(1);
			fireEvent.change(weightEl[0].querySelector("input"), { target: { value: "50" } });
			const repsEl = await screen.findAllByLabelText("reps-input");
			fireEvent.change(repsEl[0].querySelector("input"), { target: { value: "10" } });
		});
		
		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises.length).toEqual(1);
			expect(state.exercises[0].sets.length).toEqual(1);
			expect(state.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "50", reps: "10" }));
			expect(state.exercises[0]).toEqual(expect.objectContaining({ exerciseName: "Front Squats" }));
			expect(state.workoutName).toEqual("Leg Day");
		});
		
		await act(async () => {
			fireEvent.click(screen.getByLabelText("add-set-btn"));
		});
		
		let weightElements;
		await waitFor(async () => {
			weightElements = await screen.findAllByLabelText("weight-input");
			expect(weightElements.length).toEqual(2);
		});

		await act (async () => {
			const weightEl = await screen.findAllByLabelText("weight-input");
			fireEvent.change(weightEl[1].querySelector("input"), { target: { value: "55" } });
			const repsEl = await screen.findAllByLabelText("reps-input");
			fireEvent.change(repsEl[1].querySelector("input"), { target: { value: "8" } });
		});

		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises[0].sets.length).toEqual(2);
			expect(state.exercises[0].sets[1]).toEqual(expect.objectContaining({ weight: "55", reps: "8" }));
		});
		
		await act (async () => {
			fireEvent.click(screen.getAllByLabelText("delete-set-btn")[0]);
		});

		await waitFor(async () => {
			weightElements = await screen.findAllByLabelText("weight-input");
			expect(weightElements.length).toEqual(1);

			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises[0].sets.length).toEqual(1);
			expect(state.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "55", reps: "8" }));
		});
		
		await act (async () => {
			const addExerciseBtnEl = screen.getByLabelText("add-exercise-button");
			fireEvent.click(addExerciseBtnEl);
		});

		await waitFor(() => {
			expect(screen.getByText("Select Exercise")).toBeInTheDocument();
		});

		await act (async () => {
			const backSquatListBtn = await screen.findByText("Back Squats");
			fireEvent.click(backSquatListBtn);
		});

		let exerciseCardElements;
		await waitFor(async () => {
			exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			expect(exerciseCardElements.length).toEqual(2);

			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(screen.getByText("Front Squats")).toBeInTheDocument();
			expect(state.exercises.length).toEqual(2);
		});

		await act (async () => {
			const withinCard = within(exerciseCardElements[1]);
			const weightEl = await withinCard.findAllByLabelText("weight-input");
			fireEvent.change(weightEl[0].querySelector("input"), { target: { value: "20" } });
			const repsEl = await withinCard.findAllByLabelText("reps-input");
			fireEvent.change(repsEl[0].querySelector("input"), { target: { value: "10" } });
		});
		
		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises.length).toEqual(2);
			expect(state.exercises[1].sets.length).toEqual(1);
			expect(state.exercises[1]).toEqual(expect.objectContaining({ exerciseName: "Back Squats" }));
			expect(state.exercises[1].sets[0]).toEqual(expect.objectContaining({ weight: "20", reps: "10" }));
		});

		await act (async () => {
			fireEvent.click(screen.getAllByLabelText("delete-exercise-btn")[0]);
		});

		await waitFor(() => {
			const state = JSON.parse(screen.getByTestId("testState").textContent);
			expect(state.exercises.length).toEqual(1);
			expect(state.exercises[0].sets[0]).toEqual(expect.objectContaining({ weight: "20", reps: "10" }));
		});
	});
});