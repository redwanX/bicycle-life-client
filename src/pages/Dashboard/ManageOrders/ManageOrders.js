import axios from 'axios';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import DeleteItemsModal from './DeleteItemsModal';
import Items from './Items';

const ManageOrders = () => {
   
   return(
   <div>
     </div>
   )
}

export default ManageOrders