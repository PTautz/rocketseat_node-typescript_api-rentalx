import { DeleteResult } from "typeorm";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  // async findByName(name: string): Promise<Category> {
  //   const category = this.categories.find(category => category.name === name);
  //   return category;
  // }

  // async list(): Promise<Category[]> {
  //   const all = this.categories;
  //   return all;
  // }
  async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async delete(license_plate: string): Promise<DeleteResult> {
    const deleteResult = new DeleteResult();

    const findCar = this.cars.findIndex(car => car.license_plate === license_plate);
    this.cars.splice(findCar, 1);

    return deleteResult;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    // filter retorna uma lista de objetos - buscar somente carros disponíveis
    const all = this.cars.filter(car => {
      if (car.available === true || (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name)) {
        return car;
      }
      console.log("Carro não será incluído na lista de retorno");
      return null;
    });

    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };