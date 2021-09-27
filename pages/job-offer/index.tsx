import Container from "@/components/container";
import Heading from "@/components/heading";
import AuthenticatedLayout from "@/components/layouts/authenticatedLayout";
import LinkButton from "@/components/linkButton";
import prisma from "@/lib/prisma";
import { getResultForAuthenticatedPage } from "@/utils/pageUtils";
import { GetServerSideProps } from "next";
import * as React from "react";
import useSWR from "swr";

export default function JobOffer({ initialJobOffers }) {
  const { data: jobOffers } = useSWR("api/job-offer", {
    fallbackData: initialJobOffers,
    revalidateOnMount: true
  });

  return (
    <>
      <Heading variant="pageHeading">Job offer</Heading>
      <Container className="mb-8">
        {jobOffers?.map(jobOffer => (
          <div key={jobOffer.id} className="flex gap-4 justify-start items-center mb-4">
            <div>{jobOffer.firstName}</div>
            <div>{jobOffer.lastName}</div>
            <div>{jobOffer.email}</div>
            <div>{jobOffer.phone}</div>
            <LinkButton href={`/job-offer/${jobOffer.id}/edit`}>Edit</LinkButton>
            <LinkButton variant="secondary" href={`/job-offer/${jobOffer.uuid}`}>
              View
            </LinkButton>
          </div>
        ))}
      </Container>
      <LinkButton href="/job-offer/create">Create job offer</LinkButton>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const authenticatedPageProps = await getResultForAuthenticatedPage(context);

  return {
    props: {
      ...authenticatedPageProps.props,
      // TODO
      initialJobOffers: (await prisma.jobOffer.findMany({})).map(jobOffer => ({
        ...jobOffer,
        created: jobOffer.created.toISOString(),
        updated: jobOffer.created.toISOString(),
        commission: +jobOffer.commission
      }))
    }
  };
};

JobOffer.layoutProps = {
  meta: {
    title: "Job offer"
  },
  Layout: AuthenticatedLayout
};
