import { api } from '.';

export function getAllExperiments(payload) {
  return api('/experiments/getAllExperiments', payload);
}

export function addExperiment(data) {
  return api('/experiments/add', data);
}

export function modifyExperiment(data) {
  return api('/experiments/modify', data);
}

export function uploadExperimentResults(exp_customize_id, data) {
  return api('/experimentResults/addResults', { exp_customize_id, data });
}

export function getResultsByExpCustomizetId(exp_customize_id) {
  return api('/experimentResults/getResultsByExpCustomizetId', {
    exp_customize_id
  });
}

export function getAllCl() {
  return api('/experiments/getAllCl');
}

export function getAllCornea() {
  return api('/experiments/getAllCornea');
}

export function getAllExperimentDate() {
  return api('/experiments/getAllExperimentDate');
}

export function getAllClByDate(date) {
  return api('/experiments/getAllClByDate', { date });
}

export function getAllPressureByDateAndCl(date, cl_name) {
  return api('/experiments/getAllPressureByDateAndCl', { date, cl_name });
}

export function getAllTrialByDateAndClAndPressure(date, cl_name, pressure) {
  return api('/experiments/getAllTrialByDateAndClAndPressure', {
    date,
    cl_name,
    pressure
  });
}

export function getExperimentByCondition(date, cl_name, pressure, trial) {
  return api('/experiments/getExperimentByCondition', {
    date,
    cl_name,
    pressure,
    trial
  });
}
