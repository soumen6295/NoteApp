import todoSchema from '../model/todoSchema.js';


export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const existing = await todoSchema.findOne({ title: title, },{ $set: { title, status } });

    if (existing) {
      return res.status(400).json({ success: false, message: "Title already exists", });
    }
    const data = await todoSchema.create({  title, userId: req.userId, description,});
    if (data) {
      return res.status(200).json({ success: true, message: "Task created successfully", data: data,  });
    }
  } catch (error) {
    return res.status(500).json({ success: false,  message: "could not access nnnnnnn", });
  }
};




export const getAllTask = async (req, res) => {
  try {
    const data = await todoSchema.find({ userId: req.userId,});
    if (data) {
      return res.status(200).json({ success: true,  message: "Task fetched successfully", data: data, });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "could not access", });
  }
};




export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, status } = req.body;
    const data = await todoSchema.findOneAndUpdate({ _id: taskId, userId: req.userId },{ $set: { title, status } }, { new: true });

    if (!data) {
      return res.status(404).json({ success: false, message: "Task not found or not authorized",});
    }

    return res.status(200).json({ success: true, message: "Task updated successfully", data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not update task", error: error.message, });
  }
};




export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = await todoSchema.findByIdAndDelete({  userId: req.userId , _id: taskId});
    if (data) {
      return res.status(200).json({ success: true, message: "Task deleted successfully", data: data, })
    }
    else {
      return res.status(404).json({ success: false, message: "Task not found", data: data, })
    }

  } catch (error) {
    return res.status(500).json({  success: false, message: "could not access", });
  }
}