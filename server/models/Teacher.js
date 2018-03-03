module.exports = (sequelize, DataType) => { 
  const teacher = sequelize.define('teacher', {
    id_teacher: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataType.STRING(100), 
      allowNull: false,
    },
    last_name: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    identity_card: {
      type: DataType.STRING(100),
      allowNull: false
    },
    degree: {
      type: DataType.STRING(),
      allowNull: false
    }
  })

  teacher.associate = (models) => {
    teacher.hasMany(models.subject, { as: 'subjects', foreignKey: { name: 'fid_teacher', allowNull: false } })
  }

  return teacher
}