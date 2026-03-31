import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ChannelCard from '../components/ChannelCard';

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const { data: cards, }
}