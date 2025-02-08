import { create } from "zustand";

const useAdminStore = create((set) => ({
  quizzes: [],
  categories: [],
  users: [],

  // Initialize state from loader
  initializeAdminData: ({ quizzes, categories, users }) => {
    // console.log("Setting initial state:", { quizzes, categories, users });
    set({ quizzes, categories, users });
  },

  // Update individual pieces if needed
  setQuizzes: (quizzes) => set({ quizzes }),
  setCategories: (categories) => set({ categories }),
  setUsers: (users) => set({ users }),

  // /Add users
  addUser: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser],
    })),

  removeUser: (userId) =>
    set((state) => {
      // console.log("Removing user with ID:", userId); // Add a debug log
      const updatedUsers = state.users.filter(
        (user) => String(user._id) !== String(userId) // Ensuring both IDs are of type string
      );
      // console.log("Updated users:", updatedUsers); // Check the updated list
      return { users: updatedUsers };
    }),

  // Add a new category
  addCategory: (newCategory) =>
    set((state) => ({
      categories: [...state.categories, newCategory],
    })),

  // Remove a category
  removeCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter(
        (category) => category._id !== categoryId
      ),
    })),

  // Add a new quiz
  addQuiz: (newQuiz) =>
    set((state) => ({
      quizzes: [...state.quizzes, newQuiz],
    })),

  // Remove quiz
  removeQuiz: (quizId) =>
    set((state) => ({
      quizzes: state.quizzes.filter((quiz) => quiz._id !== quizId),
    })),
}));

export default useAdminStore;
