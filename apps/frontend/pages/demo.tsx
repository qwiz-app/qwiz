import { Select, Badge, SegmentedControl, Input, Button } from '@mantine/core';
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
          //   sx={(theme) => ({
          //     input: {
          //       backgroundColor: theme.colors.gray[1],
          //       border: 'none',
          //     },
          //   })}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: '.5rem',
        }}
      >
        <Badge color="pink">Default light badge</Badge>
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
          <Button variant="default" loaderPosition="right" loading>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Demo;
