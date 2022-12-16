import Head from "next/head";
import Image from "next/image";
import FormikForm from "../components/FormikForm";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";
import Index from "./home/index";

export default function Home() {
  return (
    <div>
      {/* <Index /> */}
      {/* <Modal /> */}
      <FormikForm />
    </div>
  );
}
