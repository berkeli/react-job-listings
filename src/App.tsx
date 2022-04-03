import { Box, ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import JobListingCard from './components/JobListingCard';
import { JOB_LISTINGS } from './constants';
import { FilterType, JobListing } from './entities';

function App() {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([])
  const [jobListings, setJobListings] = useState<JobListing[]>(JOB_LISTINGS);

  const addFilter = (key:string, e: React.MouseEvent) => {
    const filter:string = (e.target as HTMLButtonElement).value;
    if (!selectedFilters.some((f) => f.type === key && f.name === filter)) {
      setSelectedFilters([...selectedFilters, { type: key, name: filter }]);
    }
  }

  useEffect(() => {
    const filtered = JOB_LISTINGS.filter((job) => selectedFilters.every(({ type, name }) => {
      if (type === 'role') {
        return job.role === name
      }
      if (type === 'level') {
        return job.level === name
      }
      if (type === 'languages') {
        return job.languages.includes(name)
      }
      if (type === 'tools') {
        return job.tools.includes(name)
      }
      return true;
    }))

    setJobListings(filtered);
  }, [selectedFilters]);

  return (
    <ChakraProvider>
      <Box as='main'>
        <Header filters={selectedFilters} isDesktop={isDesktop} setSelectedFilters={setSelectedFilters}/>
        <Box px={isDesktop ? '10%' : '5%'} pt='16'>
          {jobListings.map((jobListing, i) => <JobListingCard addFilter={addFilter} key={i} job={jobListing} isDesktop={isDesktop}/>)}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
