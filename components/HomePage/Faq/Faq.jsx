import React from "react";
import faqImg from "../../../assets/others/faq.png";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Faq = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-xl text-center md:text-2xl lg:text-4xl xl:text-5xl font-semibold text-[#000000] dark:text-white">
        Frequently Asked <span className="text-[#E76F51]">Questions</span>
      </h2>
      <div className="py-6 xl:py-24 flex flex-col lg:flex-row items-center gap-6 px-3 lg:px-0">
        <div className="faqi flex-1 ">
          <Image src={faqImg} width={450} alt="this is faq image here" className="w-9/12 pt-6 lg:w-6/12 lg:pt-0 mx-auto"/>
        </div>
        <div className="accordions flex-1">
      <Accordion
  type="single"
  collapsible
  className="w-full cursor-pointer rounded-2xl border border-gray-100 bg-white text-gray-800 shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors p-6"
  defaultValue="item-1"
>
  {/* Question 1 */}
  <AccordionItem value="item-1" className="border-b border-gray-300 dark:border-gray-800">
    <AccordionTrigger className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      1. What types of bikes are available in your shop?
    </AccordionTrigger>
    <AccordionContent className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 leading-relaxed px-2">
      <p>
        Our shop offers a wide range of bikes including sports, commuter,
        cruiser, and off-road models. Popular brands like Yamaha, Honda, Suzuki,
        and KTM are available.
      </p>
      <p>
        All bikes are sourced directly from official dealerships to ensure
        quality and long-lasting reliability.
      </p>
    </AccordionContent>
  </AccordionItem>

  {/* Question 2 */}
  <AccordionItem value="item-2" className="border-b border-gray-300 dark:border-gray-800">
    <AccordionTrigger className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      2. Do you provide servicing after bike purchase?
    </AccordionTrigger>
    <AccordionContent className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 leading-relaxed px-2">
      <p>
        Yes, we offer free first servicing after every bike purchase along with
        discounted regular maintenance services.
      </p>
      <p>
        Our expert mechanics handle engine tuning, performance checks, and
        spare part replacements using genuine parts only.
      </p>
    </AccordionContent>
  </AccordionItem>

  {/* Question 3 */}
  <AccordionItem value="item-3" className="border-b border-gray-300 dark:border-gray-800">
    <AccordionTrigger className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      3. What are your delivery and payment options?
    </AccordionTrigger>
    <AccordionContent className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 leading-relaxed px-2">
      <p>
        We provide both in-store pickup and nationwide home delivery. Standard
        delivery takes 3–5 business days, while express delivery arrives within
        1–2 days.
      </p>
      <p>
        Payments can be made via cash, bank transfer, or online methods like
        cards and mobile banking.
      </p>
    </AccordionContent>
  </AccordionItem>

  {/* Question 4 */}
  <AccordionItem value="item-4" className="border-b border-gray-300 dark:border-gray-800">
    <AccordionTrigger className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      4. What is your return or exchange policy?
    </AccordionTrigger>
    <AccordionContent className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 leading-relaxed px-2">
      <p>
        We offer a 7-day return or exchange policy for unused bikes in their
        original condition. Manufacturing defects are covered under the brand
        warranty.
      </p>
      <p>
        Refunds or exchanges are processed within 48 hours after inspection.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>


        </div>
      </div>
    </div>
  );
};

export default Faq;
