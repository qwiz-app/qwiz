import { Avatar, Box, Button, Group, Text } from '@mantine/core';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import { FileUpload } from 'components/UI/FileUpload';
import { useCurrentSession } from 'hooks/api/session';
import { useUser, useUsers } from 'hooks/api/users';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useGenerateThumbnail } from 'hooks/use-generate-thumbnail';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const IndexPage = () => {
  const { isAuthenticated, user: currentUser } = useCurrentSession();
  const { data: users, error } = useUsers();
  const [id, setId] = useState<string>(null);
  const {
    data: selectedUser,
    isSuccess,
    isError,
    error: selectedUserError,
  } = useUser(id);

  const signOutHandler = () =>
    signOut({
      callbackUrl: '/signin?signOut=true',
    });

  const { selectFile, uploadFile, uploadingStatus, url, file } =
    useFileUpload();

  const { mutate } = useGenerateThumbnail();

  return (
    <Group direction="column">
      <p>Please select a file to upload</p>
      <Button
        onClick={() =>
          mutate({
            url: 'https://qwiz.party',
          })
        }
      >Mutate</Button>
      <FileUpload
        selectFile={selectFile}
        loading={uploadingStatus === 'UPLOADING'}
      />
      {url && <img src={url} />}
      {file && (
        <>
          <p>Selected file: {file.name}</p>
          <Button
            onClick={uploadFile}
            // TODO: windicss
            className="bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
            loading={uploadingStatus === 'UPLOADING'}
          >
            Upload a File!
          </Button>
        </>
      )}
      <Group direction="column" align="center">
        <Text size="xl">All users</Text>
        {users?.map((user) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              onClick={() => setId(user.id)}
              src={user.image}
              alt={user.name}
              radius="xl"
            />
            {user.name === currentUser?.name ? 'You' : user.name}
          </div>
        ))}
        {error && <p>{error.response.data?.message}</p>}
        <Group spacing={8}>
          {isAuthenticated ? (
            <Button onClick={signOutHandler} variant="filled">
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn()} variant="filled">
              Sign in
            </Button>
          )}
        </Group>
      </Group>
      <Box mt={16}>
        <Text size="sm" color={isError ? 'red' : 'currentColor'}>
          {isSuccess
            ? selectedUser.email
            : selectedUserError?.response.data.message}
        </Text>
      </Box>
    </Group>
  );
};

export default IndexPage;

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
