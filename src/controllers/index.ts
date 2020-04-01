import { Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response) => {
    res.json(req.user);
  };
}

export default new IndexController();
