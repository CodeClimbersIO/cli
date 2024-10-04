const getLatestPulses = () => {
  // Example query
  const query = `
    SELECT *
    FROM activities_pulse
    ORDER BY id DESC
    LIMIT 10
  `
  return query
}

const getAllPulses = () => {
  const query = `
    SELECT *
    FROM activities_pulse
    ORDER BY created_at DESC
  `
  return query
}

export default {
  getAllPulses,
  getLatestPulses,
}
