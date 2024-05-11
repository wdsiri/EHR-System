const { DataTypes } = require('sequelize');
const definePatientModel = require('../backend/models/Patient');

describe('Patient Model', () => {
  // Mock sequelize instance
  const sequelizeMock = {
    define: jest.fn(() => ({ tableName: 'Patient' }))
  };

  // Mock DataTypes
  const dataTypesMock = {
    INTEGER: 'INTEGER',
    DATEONLY: 'DATEONLY',
    STRING: jest.fn(() => 'STRING'),
    TEXT: 'TEXT',
    DECIMAL: jest.fn(() => 'DECIMAL')
  };

  // Mock sequelize model definition
  const patientModel = definePatientModel(sequelizeMock, dataTypesMock);

  it('should define the Patient model', () => {
    // Verify that sequelize.define is called with correct arguments
    expect(sequelizeMock.define).toHaveBeenCalledWith('Patient', {
      id: {
        type: 'INTEGER',
        allowNull: false,
        primaryKey: true
      },
      section_id: {
        type: 'INTEGER',
        allowNull: true,
        references: {
          model: 'Sections',
          key: 'section_id'
        }
      },
      emergency_contact_name: { type: 'STRING', allowNull: true },
      emergency_contact_number: { type: 'STRING', allowNull: true },
      insurance: { type: 'STRING', allowNull: true },
      gender: { type: 'STRING', allowNull: true },
      gender_at_birth: { type: 'STRING', allowNull: true },
      fname: { type: 'STRING', allowNull: true },
      lname: { type: 'STRING', allowNull: true },
      dob: { type: 'DATEONLY', allowNull: true },
      religion: { type: 'STRING', allowNull: true },
      height: { type: 'DECIMAL', allowNull: true },
      weight: { type: 'DECIMAL', allowNull: true },
      primary_diagnosis: { type: 'TEXT', allowNull: true },
      pert_history: { type: 'TEXT', allowNull: true },
      prev_medhistory: { type: 'TEXT', allowNull: true },
      social_history: { type: 'TEXT', allowNull: true },
      advanced_directives: { type: 'TEXT', allowNull: true },
      temperature: { type: 'DECIMAL', allowNull: true },
      heart_rate: { type: 'INTEGER', allowNull: true },
      bps: { type: 'STRING', allowNull: true },
      bpd: { type: 'STRING', allowNull: true },
      blood_oxygen: { type: 'DECIMAL', allowNull: true },
      resting_respiratory: { type: 'INTEGER', allowNull: true },
      pain: { type: 'INTEGER', allowNull: true }
    }, {
      sequelize: sequelizeMock,
      tableName: 'Patient',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "patient_fk1_idx",
          using: "BTREE",
          fields: [
            { name: "section_id" },
          ]
        },
      ]
    });
  });
});
