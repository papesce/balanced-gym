import { Routine } from "../redux/model";

const routine1: Routine = {
    _id: "59ee3ddc243a5977dab96c2b",
    name: "Chest Triceps Forearms Neck"
};

const routine2: Routine = {
    _id: "59f0c59d4e55c40d38868034",
    name: "Thighs Shoulders Calves"
};

const routine3: Routine = {
    _id: "59f3a4fb73da258989f47cf0",
    name: " Back Biceps Waist Hips"
};

const routines = [routine1, routine2, routine3];

export const getRoutines = (): Array<Routine> => {
    return routines;
};

export const getRoutine = (routineId: String) => {
    const filtered = routines.filter( routine =>  routine._id === routineId );
    if (filtered.length > 0) {
        return filtered[0].name;
    }
    return "";
};
