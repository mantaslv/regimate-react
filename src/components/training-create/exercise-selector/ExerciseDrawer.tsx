import React, { FC }from "react";
import ExerciseSelector from "./ExerciseSelectorNew";
import LeftDrawer from "../../styled-components/LeftDrawer";

interface ExerciseDrawerProps {
    open: boolean;
    drawerWidth: number;
	inWorkout: boolean;
}

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ open, drawerWidth, inWorkout }) => {
	return (
		<LeftDrawer open={open} drawerWidth={drawerWidth} drawerHeader="Exercise Drawer">
			<ExerciseSelector inWorkout={inWorkout}/>
		</LeftDrawer>
	);
};

export default ExerciseDrawer;