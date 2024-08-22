import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import NewBlogForm from "./components/NewBlogForm/NewBlogForm";
import ReadBlogs from "./components/ReadBlogs/ReadBlogs";
import UpdateBlogForm from "./components/UpdateBlogForm/UpdateBlogForm";
import UserPosts from "./components/UserPosts/UserPosts";
import AuthPage from "./pages/AuthPage/AuthPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import HomePage from "./pages/HomePage/HomePage";

beforeAll(() => {
  console.error = jest.fn();
});

describe("Component Tests", () => {
  test("renders Header component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/Blogger/i)).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<Footer />);
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
  });

  test("renders Sidebar component", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create New Blog/i)).toBeInTheDocument();
  });

  test("renders NewBlogForm component", () => {
    render(
      <MemoryRouter>
        <NewBlogForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/new blog/i)).toBeInTheDocument();
  });

  test("renders ReadBlogs component", () => {
    render(<ReadBlogs />);
    expect(screen.getByText(/read blogs/i)).toBeInTheDocument();
  });

  test("renders UpdateBlogForm component", () => {
    render(
      <MemoryRouter>
        <UpdateBlogForm />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders UserPosts component", () => {
    render(
      <MemoryRouter>
        <UserPosts />
      </MemoryRouter>
    );
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});

describe("Page Tests", () => {
  test("renders AuthPage", () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
    const loginButtons = screen.getAllByText(/login/i);
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  test("renders BlogPage", () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Explore Blogs/i)).toBeInTheDocument();
  });

  test("renders HomePage", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cooking Blogs/i)).toBeInTheDocument();
  });
});
