import { Response, Request, NextFunction } from "express";


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
    // console.log("called");
    // res.render("api/index", {
    //   title: "API Examples"
    // });
    res.send("Eureka !!!");
  };