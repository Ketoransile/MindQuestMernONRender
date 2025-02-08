import { create } from "zustand";

const useUsersStore = create((set) => ({
  quizzes: [],
  results: [], // Store user results
  selectedQuiz: null,

  // Initialize state from loader
  initializeUsersData: ({ quizzes, results }) => {
    set({
      // quizzes: Array.isArray(quizzes) ? quizzes : [],
      // results: Array.isArray(results) ? results : [], // Ensure results is an array
      quizzes,
      results,
    });
  },

  // Select a quiz
  setSelectedQuiz: (quiz) => set({ selectedQuiz: quiz }),

  // Set results (replace all results)
  setResults: (newResults) =>
    set({ results: Array.isArray(newResults) ? newResults : [] }),

  // Add a new result
  // addResult: (newResult) =>
  //   set((state) => ({
  //     results: [...state.results, newResult], // Append new result
  //   })),
  addResult: (newResult) =>
    set((state) => ({ results: [newResult, ...state.results] })),
  // Remove a result by ID
  removeResult: (resultId) =>
    set((state) => ({
      results: state.results.filter((result) => result._id !== resultId),
    })),
}));

export default useUsersStore;
