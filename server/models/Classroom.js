module.exports = (sequelize, DataType) => {
  const classroom = sequelize.define('classroom', {
    id_classroom: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    initials: {
      type: DataType.STRING(100),
      allowNull: false
    },
    description: {
      type: DataType.STRING(300),
      allowNull: true,
    }
  });

  classroom.associate = (models) => {
    classroom.hasMany(models.schedule, { as: 'schedules', foreignKey: { name: 'fid_classroom', allowNull: false } })
  }

  return classroom;
};