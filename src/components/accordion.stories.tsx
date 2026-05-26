import type { Meta } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta: Meta = { title: 'Components/Accordion' };
export default meta;

export function Basic() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Salt?</AccordionTrigger>
        <AccordionContent>Salt is Tenex shared product UI.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
