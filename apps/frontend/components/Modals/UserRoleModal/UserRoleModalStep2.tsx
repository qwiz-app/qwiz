import { Button, Stack, TextInput } from '@mantine/core';
import { Role } from '@prisma/client';
import { useCurrentUser } from 'hooks/api/session';
import { useAppColorscheme } from 'hooks/colorscheme';
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
  const { isDark } = useAppColorscheme();

  const [hasCustomAvatar, setHasCustomAvatar] = useState(
    selectedRole === Role.ORGANIZATION
  );
  const [initalUserImage] = useState(() => {
    if (selectedRole === Role.ORGANIZATION) {
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
  };

  const generateAvatarHandler = () => {
    if (!hasCustomAvatar) {
      setHasCustomAvatar(true);
    } else {
      generateAvatar();
    }
  };

  const buttons = (
    <div className="flex justify-end">
      <Button onClick={onBack} variant={isDark ? 'light' : 'outline'}>
        Back
      </Button>
      <Button ml={8} onClick={onContinue}>
        Create account
      </Button>
    </div>
  );

  if (selectedRole === Role.ORGANIZATION) {
    return (
      <Stack spacing={16}>
        <TextInput
          placeholder="The Irish Pub"
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

        {buttons}
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
        onResetAvatar={resetUserImageHandler}
      />
      {buttons}
    </Stack>
  );
};
