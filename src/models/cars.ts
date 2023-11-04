export interface Car {
    id: number;
    identifier: string;
    pokemondb_identifier: string;
    name: string;
    types: string[];
    egg_groups: string[];
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    total: number;
}

export interface CreateCar {
    colorId: number;
    modelId: number;
    year: number;
    pictures: string[];
    costPerDayNow: number;
    costPerWeekNow: number;
    costPerMonthNow: number;
    deposit: number;
    hasInsurance: boolean;
    minDays: number;
}

export interface CarType {
    id: number;
    name: string;
    icon: string;
}
