import {
  Box, Button, Flex, Image, Link, Text, Wrap, VStack,
} from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import mobileHeader from '../assets/images/bg-header-mobile.svg';
import desktopHeader from '../assets/images/bg-header-desktop.svg';
import { FilterType } from '../entities';

interface IHeaderProps {
  filters: FilterType[];
  isDesktop: boolean;
  setSelectedFilters: (e:FilterType[]) => void;
}

const Header = ({ filters, isDesktop, setSelectedFilters }:IHeaderProps): JSX.Element => {
  const clearFilters = () => {
    setSelectedFilters([]);
  }
  const removeFilter = (key:string, e:MouseEvent) => {
    const filter:string = (e.currentTarget as HTMLButtonElement).value;
    setSelectedFilters(filters.filter((f:FilterType) => f.type !== key && f.name !== filter));
  }
  return (
    <VStack position='relative'>
        <Image src={isDesktop ? desktopHeader : mobileHeader} alt="Job Listings Header" w='100%' sx={{ position: 'relative' }}/>
            <Flex minHeight='20' shadow='xl' borderRadius='5' w={isDesktop ? '80%' : '90%'} position='absolute' bottom='-10' bg='white' justifyContent='space-between'>
              <Wrap p='5' flexWrap='wrap'>
                  {filters.map((filter, id) => <Filter removeFilter={removeFilter} filter={filter} key={filter.name + id}/>)}
              </Wrap>
              <Flex alignItems='center' pr='6'>
              {filters.length > 0 && <Link onClick={clearFilters}>Clear</Link>}
              </Flex>
            </Flex>
    </VStack>
  );
}

export default Header;

interface IFilterProps {
  filter: FilterType;
  removeFilter: (key:string, e:MouseEvent) => void;
}

const Filter = ({ filter, removeFilter }: IFilterProps) => (
        <Button as='button' px='0' h='auto' value={filter.name} onClick={(e) => removeFilter(filter.type, e)} role='group'>
            <Text as='span' px='2'> {filter.name} </Text>
            <Box as='span' color='teal.500' _groupHover={{ color: 'teal.900' }} transition='0.4s ease-in-out'>
                <AiFillCloseSquare size='32'/>
            </Box>
        </Button>
)
