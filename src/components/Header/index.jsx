import React, { Component } from 'react'
import { Button, Input, Popover, Select, DatePicker,Table, Tag, Space } from 'antd'
import {BulbOutlined}  from '@ant-design/icons';

import './home.less'

const { Option } = Select;

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',
            publisher: '',
            department: undefined,
            edition: '',
            startDateValue: null,
            endDateValue: null,
            endOpen: false
        };
    }

    // 日期选择
    disabledStartDate = startDateValue => {
        const { endDateValue } = this.state;
        if (!startDateValue || !endDateValue) {
            return false;
        }
        return startDateValue.valueOf() > endDateValue.valueOf();
    };

    disabledEndDate = endDateValue => {
        const { startDateValue } = this.state;
        if (!endDateValue || !startDateValue) {
            return false;
        }
        return endDateValue.valueOf() <= startDateValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    onStartChange = value => {
        this.onChange('startDateValue', value);
    };

    onEndChange = value => {
        this.onChange('endDateValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    // 点击搜索按钮
    hide = () => {
        console.log(this.state);
        this.setState({
            visible: false
        });
    };


    
    //显示高级搜索
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    //下拉选择
    handleChange = (value, type) => {
        this.setState({
            [type]: value
        });
    };
    //输入框选择
    inputChange = (e, type) => {
        console.log(e.target.value, type);
        this.setState({
            [type]: e.target.value
        });
    };

    render() {
        const { startDateValue, endDateValue, endOpen, title, publisher, department, edition } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        const advancedSearch = (
            <div style={{ width: 697, padding: '30px 0 23px 0' }}>
                <div className="searchContent">
                    <span className="searchTitle">知识标题</span>
                    <Input
                        style={{ width: 370 }}
                        value={title}
                        onChange={e => this.inputChange(e, 'title')}
                        placeholder="请输入标题名称"
                    />
                </div>
                <div className="searchContent">
                    <span className="searchTitle">发布人</span>
                    <Input
                        style={{ width: 370 }}
                        value={publisher}
                        onChange={e => this.inputChange(e, 'publisher')}
                        placeholder="请输入发布人"
                    />
                </div>
                <div className="searchContent">
                    <span className="searchTitle">部门</span>
                    <Select
                        placeholder="请选择部门"
                        style={{ width: 370 }}
                        value={department}
                        onChange={value => this.handleChange(value, 'department')}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="searchContent">
                    <span className="searchTitle">版本</span>
                    <Input
                        style={{ width: 370 }}
                        value={edition}
                        onChange={e => this.inputChange(e, 'edition')}
                        placeholder="请输入版本"
                    />
                </div>
                <div className="searchContent">
                    <span className="searchTitle">记录时间</span>
                    <DatePicker
                        style={{ width: 167 }}
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        value={startDateValue}
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    <span style={{ width: 36, display: 'inline-block', textAlign: 'center' }}>~</span>
                    <DatePicker
                        style={{ width: 167 }}
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        value={endDateValue}
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                    />
                </div>
                <Button style={{ marginLeft: 156, marginTop: 28 }} type="primary" onClick={this.hide}>
                    搜索
                </Button>
            </div>
        );
        const addonBefore = (
            <Popover
                placement="bottomLeft"
                content={advancedSearch}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <div className="gaojiss">高级搜索</div>
            </Popover>
        );
        const addonAfter = (
            <div>
                <BulbOutlined  style={{ marginRight: 11 }} type="search" />
                搜索
            </div>
        );
        return (
            <>
            <Table columns={columns} dataSource={data} />
                <div className="bgHomeHead">
                    <div className='cesi'>1988654</div>
                    <Input
                        className="headInput"
                        addonBefore={addonBefore}
                        addonAfter={addonAfter}
                        placeholder={'搜索知识'}
                    />
                </div>
            </>
        );
    }
}

export default Header;