// @flow

interface EquipmentOption {
    value: string;
    name: string;
}

const eq1: EquipmentOption = {
    value: "Dumbbell",
    name: "1 Dumbbell"
};

const eq2: EquipmentOption = {
    value: "Dumbbells",
    name: "2 Dumbbells"
};

const eq3: EquipmentOption = {
    value: "Barbell Long",
    name: "Barbell Long"
};

const eq4: EquipmentOption = {
    value: "Barbell Short",
    name: "Barbell Short"
};

const eq5: EquipmentOption = {
    value: "TRX",
    name: "TRX"
};

const equipments = [eq1, eq2, eq3, eq4, eq5];

export const getEquipments = (): Array<EquipmentOption> => {
    return equipments;
};

