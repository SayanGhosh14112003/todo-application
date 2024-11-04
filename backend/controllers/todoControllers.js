import todoModel from "../models/todoModel.js";
const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find(
      { ownerId: req.user?._id },
      { _id: 1, title: 1, description: 1, status: 1 }
    );
    res.send({
      data: todos,
      success: true,
    });
  } catch (err) {
    res.status(500).send({ data: "Error while fetching todos", succes: false });
  }
};
const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    const todo = await todoModel.create({
      title,
      description,
      ownerId: req.user?._id,
    });
    res.send({
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        _id: todo._id,
      },
      success: true,
    });
  } catch (err) {
    res.status(500).send({ data: "Error while adding todo", succes: false });
  }
};
const markTodo = async (req, res) => {
  try {
    const { _id } = req.body;
    const { status } = await todoModel.findById(_id);
    const todo = await todoModel
      .findByIdAndUpdate(_id, { status: !status }, { new: true })
      .populate("ownerId");
    res.send({
      data: {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        _id: todo._id,
      },
      success: true,
    });
  } catch (err) {
    res.status(500).send({ data: "Error while marking todo", succes: false });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const todo = await todoModel.findByIdAndDelete(_id);
    res.send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({ data: "Error while deleting todo", succes: false });
  }
};
export { getTodos, addTodo, markTodo, deleteTodo };
