module.exports = (sequelize, DataType) => {
  const schedule = sequelize.define('schedule', {
    id_schedule: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_time: {
      type: DataType.TIME,
      allowNull: false
    },
    end_time: {
      type: DataType.TIME,
      allowNull: false
    },
    days: {
      type: DataType.STRING(50),
      allowNull: false
    },
    // days: {
    //   type: DataType.ARRAY(DataType.STRING(50)),
    //   defaultValue: null,
    //   allowNull: false
    // },
    fid_classroom: {
      type: DataType.INTEGER,
      allowNull: false
    },
    fid_subject: {
      type: DataType.INTEGER,
      allowNull:false
    }
  });

  schedule.associate = (models) => {
    schedule.belongsTo(models.classroom, { as: 'classroom', foreignKey: {name: 'fid_classroom', allowNull: false}});
    schedule.belongsTo(models.subject, { as: 'subject', foreignKey: {name: 'fid_subject', allowNull: false}});
  }

  return schedule;
};