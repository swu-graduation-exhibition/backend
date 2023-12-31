import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SwuIdException } from "../models/SwuException";
import { rm, sc } from "../constants";
import { success } from "../constants/response";
import { commentService } from "../service";

const getDesignerComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    let id = req.query.id as string;
    let page = req.query.page as string;
    let limit = req.query.limit as string;

    if (!id || !page || !limit) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    if (+page == 0) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const commentList = await commentService.getDesignerCommentList(id, +page, +limit);
        return res
            .status(sc.OK)
            .send(success(sc.OK, rm.GET_DESIGNER_COMMENT_LIST_SUCCESS, commentList));
    } catch (e) {
        return next(e);
    }
};

const getCommentList = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    let id = req.query.id as string;
    let page = req.query.page as string;
    let limit = req.query.limit as string;

    if (!page || !limit) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    if (+page == 0) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    if (!id) {
        id = "";
    }

    try {
        const commentList = await commentService.getCommentList(id, +page, +limit);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_COMMENT_LIST_SUCCESS, commentList));
    } catch (e) {
        return next(e);
    }
};

const getProjectComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { id, page, limit } = req.query;

    if (!id || !page || !limit) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    if (+page == 0) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const commentList = await commentService.getProjectCommentList(+id, +page, +limit);
        return res
            .status(sc.OK)
            .send(success(sc.OK, rm.GET_PROJECT_COMMENT_LIST_SUCCESS, commentList));
    } catch (e) {
        return next(e);
    }
};

const createDesignerComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        await commentService.createDesignerComment(sender, +receiver, content);
        return res.status(sc.OK).send(success(sc.OK, rm.CREATE_DESIGNER_COMMENT_SUCCESS));
    } catch (e) {
        return next(e);
    }
};

const createProjectComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        await commentService.createProjectComment(sender, +receiver, content);
        return res.status(sc.OK).send(success(sc.OK, rm.CREATE_PROJECT_COMMENT_SUCCESS));
    } catch (e) {
        return next(e);
    }
};

const commentController = {
    getDesignerComment,
    getProjectComment,
    getCommentList,
    createDesignerComment,
    createProjectComment,
};

export default commentController;
