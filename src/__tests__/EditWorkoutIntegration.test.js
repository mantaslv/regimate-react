import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { screen, render, fireEvent, waitFor, within } from "@testing-library/react";
import TrainingEditor from "../components/training-create/TrainingEditor";
import { WorkoutContextProvider } from "../context/workoutContext";
import { AuthContextProvider } from "../context/authContext";
import { changeInputValue, clickButton, getState } from "./testHelper";

jest.mock("react-router-dom", () => ({ 
	useLocation: jest.fn(),
	useNavigate: jest.fn()
}));

describe("Workout Editor", () => {
	let mockNavigate;

	beforeEach(() => {
		const state = {};
		useLocation.mockReturnValue({ state });

		mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve([
					{ name: "Front Squats" }, 
					{ name: "Back Squats" }
				]),
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("Integration Test: Loading previous workout and editing updates state context", async () => {
		expect(true).toEqual(false);
	});
});