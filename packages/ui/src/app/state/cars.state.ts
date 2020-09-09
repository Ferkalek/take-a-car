import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ICarDTO } from "../shared/interfaces/car.interface";
import {
  AddCarsAction,
  DeleteCarAction,
  UpdateStatusOfCarAction,
  AddNewCarAction,
  UpdateCarAction,
} from "../actions/car.action";

export class CarsStateModel {
  cars: ICarDTO[];
}
@State<CarsStateModel>({
  name: "cars",
  defaults: {
    cars: [],
  },
})
@Injectable()
export class CarsState {
  @Selector()
  static cars(state: CarsStateModel): ICarDTO[] {
    return state.cars;
  }

  @Action(AddCarsAction)
  addCars(
    { getState, setState }: StateContext<CarsStateModel>,
    { cars }: AddCarsAction
  ) {
    const state = getState();
    setState({
      cars: [...state.cars, ...cars],
    });
  }

  @Action(AddNewCarAction)
  addNewCar(
    { getState, setState }: StateContext<CarsStateModel>,
    { car }: AddNewCarAction
  ) {
    const state = getState();
    setState({
      cars: [...state.cars, car],
    });
  }

  @Action(DeleteCarAction)
  deleteCar(
    { getState, setState }: StateContext<CarsStateModel>,
    { carId }: DeleteCarAction
  ) {
    const state = getState();
    setState({
      cars: [...state.cars.filter((c) => c._id !== carId)],
    });
  }

  @Action(UpdateStatusOfCarAction)
  updateStatusOfCar(
    { getState, setState }: StateContext<CarsStateModel>,
    { carId, status }: UpdateStatusOfCarAction
  ) {
    const state = getState();
    const nCars = [];
    state.cars.forEach((c) => {
      if (c._id === carId) {
        nCars.push({ ...c, isBooked: status });
      } else {
        nCars.push(c);
      }
    });
    setState({
      cars: [...nCars],
    });
  }

  @Action(UpdateCarAction)
  updateCar(
    { getState, setState }: StateContext<CarsStateModel>,
    { carId, car }: UpdateCarAction
  ) {
    const state = getState();
    const nCars = state.cars.map((c) => {
      if (c._id === carId) {
        return { ...car };
      } else {
        return c;
      }
    });
    setState({
      cars: [...nCars],
    });
  }
}
