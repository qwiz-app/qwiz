import { Button, Stack, TextInput } from '@mantine/core';
import { Role } from '@prisma/client';
import { useCurrentUser } from 'hooks/api/session';
import { useAvatarGen } from 'hooks/use-avatar-gen';
import { IdentificationBadge } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useAssignRole } from 'store/use-assign-role';
import { UserModalInfoCard } from './UserModalInfoCard';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

export const UserRoleModalStep2 = ({ onBack, onContinue }: Props) => {
  const { selectedRole, orgName, setOrgName, avatar, setAvatar } =
    useAssignRole();
  const user = useCurrentUser();

  const [hasCustomAvatar, setHasCustomAvatar] = useState(
    selectedRole === Role.ORGANIZER
  );
  const [initalUserImage, setInitialUserImage] = useState(() => {
    if (selectedRole === Role.ORGANIZER) {
      return avatar;
    }
    return user.image || avatar;
  });

  useEffect(() => {
    if (orgName) setOrgName('');
    if (avatar) setAvatar(null);
  }, []);

  const { generatedAvatar, generateAvatar } = useAvatarGen(user.email, orgName);
  useEffect(() => {
    if (generatedAvatar && setHasCustomAvatar) {
      setAvatar(generatedAvatar);
    }
  }, [generatedAvatar]);

  const resetUserImageHandler = () => {
    setHasCustomAvatar(false);
    setAvatar(null);
    setInitialUserImage(user.image || avatar);
  };

  const generateAvatarHandler = () => {
    generateAvatar();
    if (!hasCustomAvatar) {
      setHasCustomAvatar(true);
    }
  };

  if (selectedRole === Role.ORGANIZER) {
    return (
      <Stack spacing={16}>
        <TextInput
          placeholder="Pub Ching Chong"
          label="Organization name"
          description="Your account name will remain unchanged"
          variant="filled"
          size="md"
          onChange={(e) => setOrgName(e.target.value)}
          required
          icon={<IdentificationBadge size={20} weight="duotone" />}
        />
        {orgName && (
          <UserModalInfoCard
            avatar={avatar}
            role={selectedRole}
            name={orgName}
            email={user.email}
            onGenerateAvatar={generateAvatarHandler}
          />
        )}

        <div className="flex justify-between">
          <Button onClick={onBack} variant="light">
            Back
          </Button>
          <Button onClick={onContinue}>Create account</Button>
        </div>
      </Stack>
    );
  }

  return (
    <Stack>
      <UserModalInfoCard
        avatar={hasCustomAvatar ? avatar : initalUserImage}
        role={selectedRole}
        name={user.name}
        email={user.email}
        onGenerateAvatar={generateAvatarHandler}
      />
      {user?.image && (
        <Button onClick={resetUserImageHandler}>Reset avatar</Button>
      )}
      <div className="flex justify-between">
        <Button onClick={onBack} variant="light">
          Back
        </Button>
        <Button onClick={onContinue}>Create account</Button>
      </div>
    </Stack>
  );
};
