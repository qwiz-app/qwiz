import { Select, Badge, SegmentedControl, Input } from '@mantine/core';
import Button from 'components/UI/Button/Button';
import Link from 'next/link';
import { MagnifyingGlass } from 'phosphor-react';
import React, { useState } from 'react';

const Demo = (props) => {
  const [selectValue, setSelectValue] = useState('react');
  return (
    <div className="homepage">
      <div>
        <Select
          radius="xs"
          label="Your favorite framework/library"
          placeholder="Pick one"
          variant="filled"
          data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '.5rem',
        }}
      >
        <Badge>Default light badge</Badge>
        <Badge variant="dot" color="cyan">
          Dot badge
        </Badge>
        <Badge variant="outline" color="orange">
          Outline badge
        </Badge>
        <Badge variant="filled">Filled badge</Badge>
      </div>
      <div>
        <SegmentedControl
          value={selectValue}
          onChange={setSelectValue}
          data={[
            { label: 'React', value: 'react' },
            { label: 'Angular', value: 'ng' },
            { label: 'Vue', value: 'vue' },
            { label: 'Svelte', value: 'svelte' },
          ]}
        />
      </div>
      <div>
        <Input
          icon={<MagnifyingGlass weight="duotone" />}
          radius="xs"
          variant="filled"
          placeholder="Filled variant"
        />
      </div>
      <div>
        <Link href="/">
          <Button variant="default" loaderPosition="right">
            Home
          </Button>
        </Link>
        <Button loaderPosition="right">Home</Button>
        <Button color="black" loaderPosition="right">
          Home
        </Button>
      </div>
    </div>
  );
};

export default Demo;
