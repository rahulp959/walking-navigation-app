import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function TestTflApi() {
  const data = await fetch(
    "https://api.tfl.gov.uk//journey/journeyresults/kt59hy/to/51.379865,-0.1264496?walkingspeed=fast&walkingOptimization=true",
  );
  const directions = await data.json();
  console.log(directions);
  const journey = directions.journeys[0];
  return (
    <div className="flex w-xl items-center justify-center p-6 md:p-10">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {journey.legs.map((leg) => (
          <AccordionItem
            key={`${leg.duration}${leg.instruction.summary}`}
            value={`${leg.duration}${leg.instruction.summary}`}
          >
            <AccordionTrigger>{leg.instruction.summary}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
