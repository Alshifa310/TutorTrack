const getTutorByClerkId = require("./getTutorByClerkId");
const { getActiveShift } = require("./shiftService");

const getDashboardData = async (clerkUserId) => {
  const tutor = await getTutorByClerkId(clerkUserId);

  const activeShift = await getActiveShift(tutor.id);

  return {
    tutorName: tutor.name,
    isClockedIn: !!activeShift,
  };
};

module.exports = {
  getDashboardData,
};