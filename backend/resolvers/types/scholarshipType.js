
export default {
    Scholarship: {
      // Retrieves submissions submitted to this specific scholarships
      submissions (scholarship, _, context) {
        return scholarship.getSubmissions()
      }
    }
  }
  