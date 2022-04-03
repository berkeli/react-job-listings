import {
  Box, Button, Divider, Flex, Heading, Image, Text, VStack, Wrap,
} from '@chakra-ui/react';
import { JobListing } from '../entities'

interface IJobListingProps {
  job: JobListing,
  isDesktop: boolean,
  addFilter: (key:string, e: React.MouseEvent) => void,
}

const buttonStyle = {
  _hover: {
    backgroundColor: 'teal.700',
    color: 'white',
    transition: '0.4s ease-in-out',
  },
};

const JobListingCard = ({ job, isDesktop, addFilter }: IJobListingProps) => (
    <Flex shadow='md' direction={!isDesktop ? 'column' : 'row'} justifyContent='space-between' borderRadius='2' px='6' py='4' cursor='pointer' transition='0.4s ease-in-out' h={!isDesktop ? 'auto' : '10em'} mb='10' _hover={{ shadow: 'xl' }}>
        <Flex position='relative'>
          <Image mr='auto' src={job.logo} position={!isDesktop ? 'absolute' : 'static'} top={isDesktop ? 'auto' : '-2em'} left={isDesktop ? 'auto' : '1em'} height={isDesktop ? 'auto' : '3em'}/>
          <VStack mr='auto' ml='4' pt={!isDesktop ? '6' : '0'} my='2' alignItems='space-between'>
            <Box>
              {job.company}
            </Box>
            <Heading as='h2' size='md'>
              {job.position}
            </Heading>
            <Text>
              {job.postedAt} · {job.contract} · {job.location}
            </Text>
          </VStack>
        </Flex>
        {!isDesktop && <Divider />}
        <Wrap p='2' maxW='40%'>
          <Button {...buttonStyle} value={job.role} onClick={(e) => addFilter('role', e)}>{job.role}</Button>
          <Button {...buttonStyle} value={job.level} onClick={(e) => addFilter('level', e)}>{job.level}</Button>
          {job.languages.map((language, i) => <Button {...buttonStyle} value={language} onClick={(e) => addFilter('languages', e)} key={i}>{language}</Button>)}
          {job.tools.map((tool, i) => <Button {...buttonStyle} value={tool} onClick={(e) => addFilter('tools', e)} key={i}>{tool}</Button>)}
        </Wrap>
    </Flex>
)

export default JobListingCard
