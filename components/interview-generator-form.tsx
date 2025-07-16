"use client";

import React, { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form-field";

const interviewFormSchema = () => {
  return z.object({
    role: z.string().min(3),
    type: z.string(),
    level: z.string(),
    techstack: z.string(),
    amount: z.string(),
  });
};

const InterviewGeneratorForm = ({ userId }: InterviewGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = interviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      type: "technical",
      level: "",
      techstack: "",
      amount: "10",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    let req = await fetch("/api/vapi/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userid: userId }),
    });

    if (req.ok) {
      toast.success("Interview created successfully!");
      form.reset();
      router.push("/");
    } else {
      const errorData = await req.json();
      toast.error(`Error: ${errorData.error || "Failed to create interview"}`);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <h3 className="text-wrap text-center">
            Create a new interview by filling this form!
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 mt-4 form"
            >
              <FormField
                control={form.control}
                name="role"
                label="What role do you want to generate questions for?"
                placeholder="e.g. Software Engineer"
                type="text"
              />

              <FormField
                control={form.control}
                name="level"
                label="What job experience level are you targeting?"
                placeholder="select job level"
                type="select"
                selectOptions={["Junior Level", "Mid Level", "Senior Level"]}
              />

              <FormField
                control={form.control}
                name="type"
                label="What type of interview are you aiming for?"
                placeholder="select interview type"
                type="select"
                selectOptions={["Technical", "Behavioral", "Mixed"]}
              />

              <FormField
                control={form.control}
                name="techstack"
                label="What technologies are involved in the job?"
                description="Comma-separated list of technologies (e.g. React, Node.js)"
                placeholder="e.g. React, Node.js"
                type="text"
              />

              <FormField
                control={form.control}
                name="amount"
                label="How many questions do you want to generate?"
                placeholder="e.g. 10"
                type="text"
              />

              <Button className="btn" type="submit">
                {loading ? "Creating Interview..." : "Create Interview"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InterviewGeneratorForm;
