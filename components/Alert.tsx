import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";

export default function AlertDemo({ ...props }) {
  return (
    <div className="relative  w-screen">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-blue-500 w-full"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl sm:leading-none">
            Eu desenvolvo aplicações Web & mobile{" "}
            <br className="hidden md:block" />
            para ajudar a
            <span className="relative inline-block mx-3">
              <div className="absolute inset-0 transform -skew-x-12 bg-blue-500" />
              <span className="relative text-white">vida das pessoas</span>
            </span>
          </h2>
          <p className="mb-6 text-base text-blue-900 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae. explicabo. Sed ut perspiciatis unde omnis.
          </p>

          <div {...props}></div>
        </div>
      </div>
    </div>
  );
}
