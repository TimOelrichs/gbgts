export interface Pkm {
    id: string,
    name: string,
    dexNo: number,
    itemHeld: number,
    move1: number,
    move2: number,
    move3: number,
    move4: number,
    originalTrainerId: number[], // 2Bytes
    exp: number[], // 3 Bytes
    hpEv: number[],// 2Bytes
    attackEv: number[],// 2Bytes
    defenseEv: number[],// 2Bytes
    speedEv: number[],// 2Bytes
    specialEv: number[],// 2Bytes
    iv: number[],// 2Bytes
    move1pp: number,
    movepp: number,
    move3pp: number,
    move4pp: number,
    friendship: number,
    pokerus: number,
    caughtData: number[],// 2Bytes
    level: number,
    statusCondition: number,
    currentHp: number[],// 2Bytes
    maxHp: number[],// 2Bytes
    attack: number[],// 2Bytes
    defense: number[],// 2Bytes
    speed: number[],// 2Bytes
    special?: number[],// 2Bytes
    specialAttack?: number[],// 2Bytes
    specialDefense?: number[],// 2Bytes
    //these are redudant, but so the frontend doesn't have to calculate these for every entry
    ivAttack?: number;
    ivDefense?: number;
    ivSpeed?: number;
    ivSpecial?: number;
    ivHp?: number;
    starRating: number;
    textRating: string;
    isShiny?: boolean;
}

export interface Checkout {
    TrainerId: string,
    Pokemons: Pkm[]
}