import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  // constructor(private ListCategoriesUseCase: ListCategoriesUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return response.json(all).send();
  }
}

export { ListCategoriesController };
