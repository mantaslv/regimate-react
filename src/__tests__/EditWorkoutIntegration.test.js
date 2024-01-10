import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { screen, render, fireEvent, waitFor, within } from "@testing-library/react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { WorkoutContextProvider } from "../context/workoutContext";
import { AuthContextProvider } from "../context/authContext";
import { changeInputValue, clickButton, getState } from "../utils/testHelper";

jest.mock("react-router-dom", () => ({ 
	useLocation: jest.fn(),
	useNavigate: jest.fn()
}));

describe("Workout Editor", () => {
	let mockNavigate;

	beforeEach(() => {
		const state = {
			workoutName: "Test Workout",
			exercises: [
				{
					id: "a",
					exerciseName: "Exercise A",
					sets: [
						{ id: "a1", reps: "10", weight: "" },
						{ id: "a2", reps: "10", weight: "" },
						{ id: "a3", reps: "10", weight: "" },
					]
				},
				{
					id: "b",
					exerciseName: "Exercise B",
					sets: [
						{ id: "b1", reps: "20", weight: "7" },
						{ id: "b2", reps: "15", weight: "10" },
					]
				},
				{
					id: "c",
					exerciseName: "Exercise C",
					sets: [
						{ id: "c1", reps: "100", weight: "5" },
					]
				},
			]
		};
		useLocation.mockReturnValue({ state });

		mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve([
					{ name: "Front Squats" }, 
				]),
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Integration Test: Loading previous workout and editing updates state context", async () => {
		await act(async () => {
			render(
				<AuthContextProvider>
					<WorkoutContextProvider testState>
						<TrainingEditor isWorkout/>
					</WorkoutContextProvider>
				</AuthContextProvider>
			);
		});

		await waitFor(() => {
			expect(getState().exercises.length).toEqual(3);
		});

		await act(async () => {
			await changeInputValue("training-name-input", "Edited Test Workout");
			clickButton("add-exercise-btn");
		});

		await waitFor(() => {
			expect(getState().workoutName).toEqual("Edited Test Workout");
			expect(screen.getByText("Select Exercise")).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(await screen.findByText("Front Squats"));
		});

		await waitFor(() => {
			expect(screen.getByText("Front Squats")).toBeInTheDocument();
			expect(getState().exercises.length).toEqual(4);
			expect(getState().exercises[3].exerciseName).toEqual("Front Squats");
		});

		await act(async () => {
			const exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			const withinCard = within(exerciseCardElements[3]);
			await changeInputValue("weight-input", "20", 0, withinCard);
			await changeInputValue("reps-input", "10", 0, withinCard);
		});

		await waitFor(() => {
			expect(getState().exercises[3].sets.length).toEqual(1);
			expect(getState().exercises[3]).toEqual(expect.objectContaining({ exerciseName: "Front Squats" }));
			expect(getState().exercises[3].sets[0]).toEqual(expect.objectContaining({ weight: "20", reps: "10" }));
		});

		await act(async () => {
			await changeInputValue("weight-input", "50");
			await changeInputValue("weight-input", "55", 1);
			await changeInputValue("weight-input", "60", 2);
		});

		await waitFor(() => {
			expect(getState().exercises[0].sets[0]).toEqual(expect.objectContaining({ reps: "10", weight: "50" }));
			expect(getState().exercises[0].sets[1]).toEqual(expect.objectContaining({ reps: "10", weight: "55" }));
			expect(getState().exercises[0].sets[2]).toEqual(expect.objectContaining({ reps: "10", weight: "60" }));
		});

		await act(async () => {
			clickButton("add-set-btn", 1);
		});

		await waitFor(async () => {			
			expect(getState().exercises[1]).toEqual(expect.objectContaining({ exerciseName: "Exercise B" }));
			const setElements = await screen.findAllByLabelText("set-element");
			expect(setElements.length).toEqual(8);
			expect(getState().exercises[1].sets.length).toEqual(3);
		});

		await act(async () => {
			const exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			const withinCard = within(exerciseCardElements[1]);
			await changeInputValue("weight-input", "12", 1, withinCard);
			await changeInputValue("reps-input", "15", 1, withinCard);
		});

		await waitFor(() => {
			expect(getState().exercises[1]).toEqual(expect.objectContaining({ exerciseName: "Exercise B" }));
			expect(getState().exercises[1].sets[1]).toEqual(expect.objectContaining({ weight: "12", reps: "15" }));
		});

		await act(async () => {
			const exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			const withinCard = within(exerciseCardElements[1]);
			clickButton("delete-set-btn", 0, withinCard);
		});

		await waitFor(async () => {			
			expect(getState().exercises[1]).toEqual(expect.objectContaining({ exerciseName: "Exercise B" }));
			const setElements = await screen.findAllByLabelText("set-element");
			expect(setElements.length).toEqual(7);
			expect(getState().exercises[1].sets.length).toEqual(2);
		});

		act(() => clickButton("delete-exercise-btn", 2));

		await waitFor(async () => {			
			expect(getState().exercises[2]).toEqual(expect.objectContaining({ exerciseName: "Front Squats" }));
			const exerciseCardElements = await screen.findAllByLabelText("exercise-card");
			expect(exerciseCardElements.length).toEqual(3);
			expect(getState().exercises.length).toEqual(3);
		});
	});
});