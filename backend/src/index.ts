import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import errorData from "./data/errorData";
import routeData from "./data/routeData";

const PORT = 5000;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get(routeData.notes, async (req, res) => {
  const notes = await prisma.note.findMany();

  res.json(notes);
});

app.post(routeData.notes, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send(errorData.requiredError);
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });

    res.json(note);
  } catch (error) {
    res.status(500).send(errorData.internalServerError);
  }
});

app.put(routeData.noteId, async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).send(errorData.requiredError);
  }

  if (!id || isNaN(id)) {
    return res.status(400).send(errorData.idError);
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).send(errorData.internalServerError);
  }
});

app.delete(routeData.noteId, async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send(errorData.idError);
  }

  try {
    await prisma.note.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).send(errorData.internalServerError);
  }
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
