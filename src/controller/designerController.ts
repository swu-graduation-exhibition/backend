import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SwuIdException } from "../models/SwuException";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { designerService } from "../service";

const list = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const designerList = await designerService.getDesignerList();
        return res.status(sc.OK).send(success(sc.OK, rm.GET_DESIGNER_LIST_SUCCESS, designerList));
    } catch (e) {
        return next(e);
    }
};

const single = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { designerId } = req.params;

    if (!designerId) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const designer = await designerService.getDesigner(+designerId);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_DESIGNER_SUCCESS, designer));
    } catch (e) {
        return next(e);
    }
};

const projectController = {
    list,
    single,
};

export default projectController;
