import { ICarDTO } from '../shared/interfaces/car.interface';

export class AddCarsAction {
    static readonly type = '[Cars] Add Cars';

    constructor(public readonly cars: ICarDTO[]) { }
}

export class AddNewCarAction {
    static readonly type = '[Cars] Add New Car';

    constructor(public readonly car: ICarDTO) { }
}

export class DeleteCarAction {
    static readonly type = '[Cars] Add Delete Car';

    constructor(public readonly carId: string) { }
}

export class UpdateStatusOfCarAction {
    static readonly type = '[Cars] Update Status of Car';

    constructor(
        public readonly carId: string,
        public readonly status: boolean
    ) { }
}

export class UpdateCarAction {
    static readonly type = '[Cars] Update Car';

    constructor(
        public readonly carId: string,
        public readonly car: ICarDTO
    ) { }
}
