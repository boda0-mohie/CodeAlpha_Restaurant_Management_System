const roleStatusMap = {
  preparing: ["chef"],
  ready: ["chef"],
  on_the_way: ["delivery"],
  delivered: ["delivery"],
  completed: ["admin"], // admin only
};

const validateStatusChange = (req, res, next) => {
  try {
    const userRole = req.user.role;
    const { status } = req.body;

    if (!roleStatusMap[status]) {
      return res.status(400).json({
        message: `Invalid status: '${status}'`,
      });
    }

    if (!roleStatusMap[status].includes(userRole) && userRole !== "admin") {
      return res.status(403).json({
        message: `Role '${userRole}' is not allowed to change status to '${status}'.`,
      });
    }

    next();

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = validateStatusChange;
