/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Loading, TablePagination } from '@/components';
import CreateUserModal from '@/components/Modal/CreateUserModal';
import { getReq } from '@/utils/apiHandlers';

const Users = () => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dataPerPage = 10;
  // For Action BUtton

  const createUserModalHandler = () => {
    setOpenCreateUserModal(true);
  };
  const getUserData = useCallback(async () => {
    setLoading(true);
    const skip = dataPerPage * (page - 1);
    try {
      const query = new URLSearchParams();
      query.append('skip', skip);
      query.append('take', dataPerPage);

      const res = await getReq(`/user/users?${query}`);
      const { data, status, error } = res;

      console.log(res, ' res of users');
      if (status) {
        setUsers(data);
      } else {
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="px-5">
          <header className="flex justify-between items-center mt-10 mb-3">
            <div className="flex items-center gap-5">
              <h3 className="text-24 font-medium">Users</h3>
              <button
                className="text-white font-medium py-2 px-5 rounded-md text-14 bg-primary-1200 font-comfortaa w-full"
                onClick={createUserModalHandler}
              >
                Create User
              </button>
            </div>
          </header>

          <div>
            <div className="rounded-xl shadow-[0_0_30px_0_#2D46DE30] text-black">
              <div className="responsive-tbl">
                <table className="rounded-xl min-w-[450px]">
                  <thead className="rounded-t-xl text-16 font-medium  bg-[#ABD5FFA1]">
                    <tr className=" h-[45px]">
                      <th>S. No.</th>
                      <th className="">Username</th>
                      <th className="">Email</th>
                      {/* <th className="truncate">Chat</th> */}
                    </tr>
                  </thead>
                  <tbody className="rounded-b-xl">
                    {users?.users?.map((item, index) => {
                      const serial = dataPerPage * (page - 1) + index + 1;
                      return (
                        <tr
                          key={index}
                          className="font-poppins cursor-pointer text-14 text-black  h-[45px] hover:bg-[#ABD5FF42]"
                        >
                          <td>#{serial}</td>
                          <td className="">{item?.username}</td>
                          <td className="">{item?.email}</td>
                          {/* <td className="pr-5 break-all">
                            <button className="bg-[#2874f0] px-4 py-1 rounded-md">
                              Chat
                            </button>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <TablePagination
              page={page}
              data={users}
              dataToShowOnPage={dataPerPage}
              setCurrentPage={setPage}
            />
          </div>
        </div>
      )}

      <CreateUserModal
        openModal={openCreateUserModal}
        closeModal={setOpenCreateUserModal}
        getUserData={getUserData}
      />
    </>
  );
};

export default Users;
{
  /* <td className=" text-center">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClickMore}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="more"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMore}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        elevation="3"
                      >
                        <MenuItem
                          className="hover:bg-[#eee] font-reemKufi font-normal text-14 flex py-2 items-center px-4 rounded-[2px]"
                          onClick={handleCloseMore}
                          sx={{ width: '125px' }}
                        >
                          Active
                        </MenuItem>
                        <MenuItem
                          className="hover:bg-[#eee] font-reemKufi font-normal text-14 flex py-2 items-center px-4 rounded-[2px]"
                          sx={{ width: '125px' }}
                          onClick={editUserModalHandler}
                        >
                          Edit
                        </MenuItem>
                      </Menu>
                    </td> */
}
