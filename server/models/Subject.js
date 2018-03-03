module.exports = (sequelize, DataType) => {
  const subject = sequelize.define('subject', {
    id_subject: {
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
    },
    fid_teacher: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  subject.associate = (models) => {
    subject.belongsTo(models.teacher, { as: 'teacher', foreignKey: {name: 'fid_teacher', allowNull: false}});
    subject.hasMany(models.schedule, { as: 'schedules', foreignKey: { name: 'fid_subject', allowNull: false } })
  }

  return subject;
};