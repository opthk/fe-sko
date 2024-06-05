const validate = values => {
  const errors = {};
  if (!values.id_interference) {
    errors.id_interference = 'Required';
  }
  if (!values.branch) {
    errors.branch = 'Required';
  }
  if (!values.event_time) {
    errors.event_time = 'Required';
  }
  if (!values.shift) {
    errors.shift = 'Required';
  }
  if (!values.event_clear) {
    errors.event_clear = 'Required';
  }
  if (!values.sta) {
    errors.sta = 'Required';
  }
  if (!values.lane) {
    errors.lane = 'Required';
  }
  if (!values.id_vehicle) {
    errors.id_vehicle = 'Required';
  }
  if (!values.accident_position) {
    errors.accident_position = 'Required';
  }
  if (!values.accident_weather) {
    errors.accident_weather = 'Required';
  }
  if (!values.accident_type) {
    errors.accident_type = 'Required';
  }
  if (!values.accident_cause) {
    errors.accident_cause = 'Required';
  }
  if (values.light_injury < 0) {
    errors.light_injury = 'This value cannot minus';
  }
  if (values.heavy_injury < 0) {
    errors.heavy_injury = 'This value cannot minus';
  }
  if (values.fatality < 0) {
    errors.fatality = 'This value cannot minus';
  }
  // if (!values.driver_name) {
  //   errors.driver_name = 'Required';
  // }
  // if (!values.driver_gender) {
  //   errors.driver_gender = 'Required';
  // }
  // if (!values.driver_age) {
  //   errors.driver_age = 'Required';
  // }
  // if (!values.driver_adress) {
  //   errors.driver_adress = 'Required';
  // }
  // if (!values.light_injury) {
  //   errors.light_injury = 'Required';
  // }
  // if (!values.heavy_injury) {
  //   errors.heavy_injury = 'Required';
  // }
  // if (!values.fatality) {
  //   errors.fatality = 'Required';
  // }
  if (!values.chronology) {
    errors.chronology = 'Required';
  }

  // if (!values.email) {
  //   errors.email = 'Required';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address';
  // }
  // if (!values.sex) {
  //   errors.sex = 'Required';
  // }
  // if (!values.favoriteColor) {
  //   errors.favoriteColor = 'Required';
  // }
  return errors;
};

export default validate;
