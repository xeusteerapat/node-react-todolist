module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    task: {
      type: DataTypes.STRING
    },
    isCompleted: {
      type: DataTypes.BOOLEAN
    }
  });

  return Task;
};
