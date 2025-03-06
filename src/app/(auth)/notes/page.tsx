"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNote, deleteNote, getNote, updateNote } from "@/store/note.slice";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import type { Note } from "@/types/note.type";

export default function Note() {
  const [isSelected, setisSelected] = useState<Note>({
    _id: "",
    title: "",
    content: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((store) => store.noteSlice);
  const router = useRouter();

  // console.log(valTitle);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string()
      .required("Content is required")
      .min(3, "Content must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addNote(values)).then(() => {
        dispatch(getNote());
      });
      setIsModalOpen(false);
      formik.resetForm();
    },
  });

  const validationSchema1 = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string()
      .required("Content is required")
      .min(3, "Content must be at least 8 characters"),
  });

  const formik1 = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      dispatch(updateNote({ id: isSelected._id, ...values })).then(() => {
        dispatch(getNote());
        setIsModalOpen1(false);
      });
      formik.resetForm();
    },
  });

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }
  useEffect(() => {
    if(notes){
    dispatch(getNote());}
  },[notes]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-3xl">📒</span>{" "}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MindB<span className="text-gray-600">loom</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="min-h-screen grid grid-cols-[1fr_4fr]">
        <div className="h-full bg-[#394648] p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">📒</span>{" "}
            <span className="text-xl text-white font-semibold">
              MindB<span className="text-[#CBAC88]">loom</span>
            </span>
          </div>

          <ul className="space-y-5">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  🏠
                </span>
                <span className="text-[#CBAC88] group-hover:text-white">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  ✨
                </span>
                <span className="text-[#CBAC88] group-hover:text-white">
                  New Note
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  🚪
                </span>
                <span className="text-[#CBAC88] group-hover:text-white">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="note section h-full bg-[#F8E9E9] p-6 relative rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-[#394648] mb-6 hidden sm:block">
            My Notes:
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-[#69995D] text-white px-5 py-3 rounded-lg hover:bg-[#394648] transition absolute right-5 top-5 shadow-md"
          >
            Add Note
          </button>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {notes ? (
              notes.map((note) => (
                <motion.div
                  key={note._id}
                  className="p-6 bg-white rounded-lg shadow-lg border border-[#EDB6A3] hover:shadow-xl transition-shadow duration-300 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-xl font-semibold text-green-700 mb-2">
                    {note.title}
                  </h2>
                  <p className="mb-4 break-words">{note.content}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(note.createdAt).toLocaleTimeString()}
                  </p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setIsModalOpen1(true);
                        setisSelected(note);
                        formik1.setValues({
                          title: note.title,
                          content: note.content,
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteNote(note._id));
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                  {/* for update  */}
                  <AnimatePresence>
                    {isModalOpen1 && (
                      <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/3"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.9 }}
                        >
                          <h2 className="text-2xl font-semibold text-[#394648] mb-6">
                            Update Your Note
                          </h2>
                          <form
                            onSubmit={formik1.handleSubmit}
                            className="space-y-5"
                          >
                            <div>
                              <input
                                type="text"
                                name="title"
                                placeholder="Enter your title"
                                value={formik1.values.title}
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                                className="w-full px-4 py-3 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
                              />
                              {formik1.touched.title &&
                                formik1.errors.title && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {formik1.errors.title}
                                  </p>
                                )}
                            </div>
                            <div>
                              <textarea
                                name="content"
                                placeholder="Write your note here..."
                                value={formik1.values.content}
                                onChange={formik1.handleChange}
                                onBlur={formik1.handleBlur}
                                className="w-full h-32 p-3 border border-[#EDB6A3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69995D] bg-[#F8E9E9]"
                              />
                              {formik1.touched.content &&
                                formik1.errors.content && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {formik1.errors.content}
                                  </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsModalOpen1(false);
                                  formik.resetForm();
                                }}
                                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition shadow-md"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={!formik1.isValid || !formik1.dirty}
                                className={`bg-[#EDB6A3] text-white px-5 py-2 rounded-lg hover:bg-[#CBAC88] transition shadow-md ${
                                  !formik1.isValid || !formik1.dirty
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[#394648]"
                                }`}
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) :  (
              <Loading />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl font-semibold text-[#394648] mb-6">
                Add a New Note
              </h2>
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.title}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    name="content"
                    placeholder="Write your note here..."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full h-32 p-3 border border-[#EDB6A3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#69995D] bg-[#F8E9E9]"
                  />
                  {formik.touched.content && formik.errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.content}
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                    className={`bg-[#EDB6A3] text-white px-5 py-2 rounded-lg hover:bg-[#CBAC88] transition shadow-md ${
                      !formik.isValid || !formik.dirty
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#394648]"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
