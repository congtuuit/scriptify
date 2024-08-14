import { Router, Request, Response } from "express";
import axios from "axios";
const router = Router();

const GOOGLE_APPSCRIPT_API =
  "https://script.google.com/macros/s/AKfycbyCLl0XUDuBUbHWP4FJu9IxDXgohpeDXvlxWCiCKNxllMNLaiSYNafp9BlBphmPYBJ_oA/exec";


/**
 * @swagger
 * /v1/documents:
 *   get:
 *     summary: Retrieve a document based on specified parameters
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         required: true
 *         description: The action to perform
 *       - in: query
 *         name: fileId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the file
 *       - in: query
 *         name: sheetName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the sheet
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *         required: true
 *         description: The range of cells to include
 *     responses:
 *       200:
 *         description: A successful response containing the document data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: File url
 *       400:
 *         description: Missing required query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Missing required query parameters
 *       500:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad request
 */
router.get("/", async (req: Request, res: Response) => {
  const { action, fileId, sheetName, range } = req.query;
  if (!action || !fileId || !sheetName || !range) {
    return res.status(400).json({
      success: false,
      message: "Missing required query parameters",
    });
  }

  let data = JSON.stringify({
    action: action,
    data: {
      fileId: fileId,
      sheetName: sheetName,
      range: range,
    },
  });

  let config = {
    method: "post",
    url: GOOGLE_APPSCRIPT_API,
    headers: { "Content-Type": "application/json" },
    data: data,
  };

  try {
    const response = await axios.request(config);
    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Bad request",
    });
  }
});

/**
 * @swagger
 * /v1/documents:
 *   post:
 *     summary: Retrieve a document based on specified parameters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: The action to perform
 *                 example: sheet2pdf
 *               fileId:
 *                 type: string
 *                 description: The ID of the file
 *                 example: <your_google_sheet_file_ID>
 *               sheetName:
 *                 type: string
 *                 description: The name of the sheet
 *                 example: Sheet1
 *               range:
 *                 type: string
 *                 description: The range of cells to include
 *                 example: A3:D10
 *     responses:
 *       200:
 *         description: A successful response containing the document data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: File url
 *       400:
 *         description: Missing required body parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Missing required body parameters
 *       500:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad request
 */
router.post("/", async (req: Request, res: Response) => {
    const { action, fileId, sheetName, range } = req.body;
  if (!action || !fileId || !sheetName || !range) {
    return res.status(400).json({
      success: false,
      message: "Missing required body parameters",
    });
  }
  
    let data = JSON.stringify({
      action: action,
      data: {
        fileId: fileId,
        sheetName: sheetName,
        range: range,
      },
    });
  
    let config = {
      method: "post",
      url: GOOGLE_APPSCRIPT_API,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
  
    try {
      const response = await axios.request(config);
      const responseData = response.data;
      res.json(responseData);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Bad request",
      });
    }
});

export default router;
